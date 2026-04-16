<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AvisoPartido extends Notification
{
    use Queueable;

    public $partido;
    public $jugador;

    public function __construct($partido, $jugador)
    {
        $this->partido = $partido;
        $this->jugador = $jugador;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new \Illuminate\Notifications\Messages\MailMessage)
        ->subject('⚽ Recordatorio: Partido de hoy')
        ->markdown('emails.partidos.aviso', [
            'partido' => $this->partido,
            'usuario' => $notifiable,
            'jugador' => $this->jugador,
        ]);
    }
}