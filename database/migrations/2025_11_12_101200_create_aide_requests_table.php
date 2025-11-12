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
        Schema::create('aide_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Encrypted
            $table->string('region');
            $table->string('type_of_violence'); // Encrypted
            $table->text('description'); // Encrypted
            $table->string('contact_method'); // email, phone, etc.
            $table->string('contact_value')->nullable(); // Encrypted
            $table->boolean('consent_given')->default(false);
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'resolved', 'archived'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aide_requests');
    }
};

