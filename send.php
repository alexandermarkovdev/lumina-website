<?php
// Receives the contact form from the home page (contact-postcard.js) and emails it to the studio.
// Needs a host that runs PHP (SiteGround does); the local Python server and GitHub Pages cannot run it,
// and there the form shows its "not sent" message.
declare(strict_types=1);

const TO = 'info@luminastudio.bg';
// Must be a real mailbox on this domain, otherwise the message is rejected or lands in spam.
const FROM = 'info@luminastudio.bg';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function finish(int $code, bool $ok): void
{
    http_response_code($code);
    echo json_encode(['ok' => $ok]);
    exit;
}

function field(string $name, int $max): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) return '';
    $value = trim(str_replace("\0", '', $value));
    // Cut on whole characters, never in the middle of a Cyrillic letter.
    return preg_match('/^.{0,' . $max . '}/us', $value, $m) ? $m[0] : '';
}

// Subject lines may only carry plain ASCII, so Cyrillic is packed into short encoded pieces.
function encodeHeader(string $text): string
{
    $words = [];
    $chunk = '';
    foreach (preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $char) {
        if (strlen($chunk . $char) > 42) {
            $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
            $chunk = '';
        }
        $chunk .= $char;
    }
    if ($chunk !== '') $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    return implode(' ', $words);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    finish(405, false);
}

// Accept the form only from this site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
if ($origin !== '' && strcasecmp((string) parse_url($origin, PHP_URL_HOST), (string) $host) !== 0) finish(403, false);

// Hidden field that people never see; only spam robots fill it in. Answer "ok" so they do not retry.
if (field('website', 200) !== '') finish(200, true);

$name = field('name', 200);
$business = field('business', 200);
$contact = field('contact', 200);
$message = field('message', 2000);

$isEmail = filter_var($contact, FILTER_VALIDATE_EMAIL) !== false;
$digits = strlen(preg_replace('/\D/', '', $contact));
$isPhone = preg_match('/^[+()\d\s.-]+$/', $contact) === 1 && $digits >= 7 && $digits <= 15;
if ($name === '' || $business === '' || (!$isEmail && !$isPhone)) finish(422, false);

$oneLine = static fn(string $text): string => trim(preg_replace('/\s+/u', ' ', $text));
$subjectName = preg_match('/^.{0,60}/u', $oneLine($business), $m) ? $m[0] : '';
$subject = encodeHeader('Заявка за демо: ' . $subjectName);

$body = "Нова заявка от формата на luminastudio.bg\n\n"
    . 'Име: ' . $oneLine($name) . "\n"
    . 'Бизнес: ' . $oneLine($business) . "\n"
    . 'Контакт: ' . $oneLine($contact) . "\n\n"
    . "Съобщение:\n" . ($message !== '' ? $message : '(няма)') . "\n\n"
    . 'Изпратено: ' . date('d.m.Y H:i') . "\n";

$headers = [
    'From: Lumina Studio <' . FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];
// With an email address, pressing "Reply" answers the customer directly.
if ($isEmail) $headers[] = 'Reply-To: ' . $contact;

$sent = mail(TO, $subject, chunk_split(base64_encode($body)), implode("\r\n", $headers), '-f' . FROM);
finish($sent ? 200 : 500, $sent);
