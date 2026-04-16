<?php
namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageHelper
{
    /**
     * Devuelve el binario de la imagen o null si no se pudo obtener.
     */
    public static function get(string $path): ?string
    {
        // 1) URL remota → HTTP Client (usa Guzzle, no stream wrappers)
        if (Str::startsWith($path, ['http://', 'https://'])) {
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0' // algunos servidores lo exigen
            ])->get($path);

            return $response->successful() ? $response->body() : null;
        }

        // 2) Ruta relativa en storage/app/public
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->get($path);
        }

        // 3) Ruta absoluta local
        if (is_file($path)) {
            return file_get_contents($path);  // esto NO viola allow_url_fopen
        }

        return null;
    }
}
