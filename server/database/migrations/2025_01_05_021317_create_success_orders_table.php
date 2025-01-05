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
        Schema::create('success_orders', function (Blueprint $table) {
            $table->id();
            $table->string('invoiceNo')->unique();
            $table->unsignedBigInteger('crewID');
            $table->string('customerName');
            $table->string('orderType');
            $table->json('meals');
            $table->string('paymentMethod');
            $table->string('referenceNumber')->nullable();
            $table->float('tender');
            $table->float('totalPrice');
            $table->float('change');
            $table->timestamps();

            $table->foreign('crewID')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('success_orders');
    }
};
