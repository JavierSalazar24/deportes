<?php

namespace App\Helpers;

class ArchivosHelper
{
    /**
     * Sube un archivo y ajusta permisos (carpeta 755, archivo 644).
     *
     * @param \Illuminate\Http\UploadedFile $archivo El archivo a subir.
     * @param string $ruta Carpeta destino (ej. 'public/firma_jugador').
     * @return string Nombre generado del archivo.
     */
    public static function subirArchivoConPermisos($archivo, $ruta = 'public')
    {
        $nombre = time() . '_' . uniqid() . '.' . $archivo->extension();
        $archivo->storeAs($ruta, $nombre);

        $carpetaPath = storage_path("app/{$ruta}");
        $archivoPath = "{$carpetaPath}/{$nombre}";

        if (file_exists($carpetaPath)) {
@chmod($carpetaPath, 0755);
        }

        if (file_exists($archivoPath)) {
@chmod($archivoPath, 0644);
        }

        return $nombre;
    }

    /**
     * Elimina un archivo si existe.
     *
     * @param string $ruta Carpeta donde se encuentra el archivo (ej. 'public/firma_jugador').
     * @param string $nombreArchivo Nombre del archivo a eliminar.
     * @return bool true si se eliminó, false si no existía.
     */
    public static function eliminarArchivo($ruta, $nombreArchivo)
    {
        // Archivos que nunca deben eliminarse
        $protegidos = [
            'default.png',
            'default.pdf',
            'chivas.png',
            'america.png',
            'cruz_azul.png',
            'pumas.png',
            'toluca.png',
            'pachuca.png',
        ];

        // Si el archivo es protegido, retorna false
        if (in_array($nombreArchivo, $protegidos)) {
            return false;
        }

        $archivoPath = storage_path("app/{$ruta}/{$nombreArchivo}");

        if (file_exists($archivoPath)) {
            return unlink($archivoPath);
        }

        return false;
    }
}