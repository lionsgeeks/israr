<?php

use App\Http\Controllers\ProgrammeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/programmes', [ProgrammeController::class, 'index']);
