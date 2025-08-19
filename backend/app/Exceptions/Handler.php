<?php

namespace App\Exceptions;

use Illuminate\Database\QueryException;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof QueryException) {
            if ($exception->getCode() === '23000' && $exception->errorInfo[1] == 1451) {
                return response()->json([
                    'message' => 'No se puede eliminar este registro porque tiene otros registros asociados.'
                ], SymfonyResponse::HTTP_CONFLICT); // 409
            }
        }

        return parent::render($request, $exception);
    }
}
