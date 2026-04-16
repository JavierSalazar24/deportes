@component('mail::message')
{{-- Logo arriba, si tienes uno --}}
<div style="text-align: center; margin-bottom: 20px;">
    <img src="{{ public_path('logo/logo2.png') }}" alt="Logo" width="100" style="margin-bottom: 8px;">
</div>

# ⚽ Recordatorio de partido

Hola, <strong>{{ $jugador->nombre }} {{ $jugador->apellido_p }} {{ $jugador->apellido_m }}</strong>

Te enviamos este mensaje para recordarte del partido **programado para hoy**.
Revisa los detalles y prepárate para dar lo mejor de ti en la cancha.

@component('mail::panel')
<table style="width:100%;">
    <tr>
        <td style="font-weight:bold;">Rival:</td>
        <td>{{ $partido->rival }}</td>
    </tr>
    <tr>
        <td style="font-weight:bold;">Categoría:</td>
        <td>{{ $partido->categoria->nombre ?? '-' }}</td>
    </tr>
    <tr>
        <td style="font-weight:bold;">Lugar:</td>
        <td>{{ $partido->lugar }}</td>
    </tr>
    <tr>
        <td style="font-weight:bold;">Fecha y hora:</td>
        <td>
            {{ \Carbon\Carbon::parse($partido->fecha_hora)->format('d/m/Y h:i A') }}
        </td>
    </tr>
</table>
@endcomponent

---

**Recomendaciones importantes:**
- Llega al menos <strong>15 minutos antes</strong> del partido.
- Lleva tu uniforme completo y credencial de identificación.
- Si tienes dudas o no puedes asistir, avisa con anticipación.

<br>

@component('mail::panel')
<div style="text-align:center; font-size:1.08em; line-height:1.6; color:#444;">
    <span style="font-weight:600; font-size:1.09em;">Contactanos si tienes alguna duda.</span>
    <br>
    📞 <a href="tel:6181234567" style="color:#4B6CB7; text-decoration:none; font-weight:500;">618 123 4567</a>
    &nbsp;|&nbsp;
    ✉️ <a href="mailto:deportes@arcanix.com.mx" style="color:#4B6CB7; text-decoration:none; font-weight:500;">deportes@arcanix.com.mx</a>
    <br>
    <span style="color:#888; font-size:0.98em; display:inline-block; margin-top:3px;">
        Nuestro equipo de coordinación está para ayudarte.
    </span>
</div>
@endcomponent

Saludos cordiales,
<strong>Equipo Arcanix</strong>

@endcomponent
