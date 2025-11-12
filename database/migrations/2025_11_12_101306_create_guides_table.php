<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guides', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_fr');
            $table->string('title_ar');
            $table->text('description_fr')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('content_fr');
            $table->text('content_ar');
            $table->string('category')->nullable(); // legal, procedural, informational
            $table->string('pdf_path')->nullable();
            $table->json('tags')->nullable();
            $table->string('language')->default('fr');
            $table->boolean('is_published')->default(true);
            $table->integer('views_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guides');
    }
};
