<?php

use App\Http\Controllers\Aide\BaseJuridiqueController;
use App\Http\Controllers\Aide\FormulaireController;
use Illuminate\Support\Facades\Route;

// Help form routes
Route::get('/aide/formulaire', [FormulaireController::class, 'create'])->name('aide.formulaire');
Route::post('/aide/formulaire', [FormulaireController::class, 'store'])->name('aide.formulaire.store');

// Legal database routes
Route::get('/aide/base-juridique', [BaseJuridiqueController::class, 'index'])->name('aide.base-juridique');
Route::get('/aide/base-juridique/lois/{loi:slug}', [BaseJuridiqueController::class, 'showLoi'])->name('aide.base-juridique.loi');
Route::get('/aide/base-juridique/jurisprudences/{jurisprudence:slug}', [BaseJuridiqueController::class, 'showJurisprudence'])->name('aide.base-juridique.jurisprudence');
Route::get('/aide/base-juridique/guides/{guide:slug}', [BaseJuridiqueController::class, 'showGuide'])->name('aide.base-juridique.guide');

