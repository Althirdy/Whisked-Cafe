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
        Schema::create('online_orders', function (Blueprint $table) {
            $table->id();
            $table->string('invoiceNo');
            $table->unsignedBigInteger('customerId');
            $table->unsignedBigInteger('crewId')->nullable();
            $table->json('meals');
            $table->float('totalPrice');
            $table->string('referenceNumber');
            $table->string('pickUp');
            $table->string('time');
            $table->string('cancelReason')->nullable();
            $table->string('orderNote')->nullable();
            $table->string('status')->default('pending')->nullable();
            $table->timestamps();


            $table->foreign('customerId')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('crewId')
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
        Schema::dropIfExists('online_orders');
    }
};
