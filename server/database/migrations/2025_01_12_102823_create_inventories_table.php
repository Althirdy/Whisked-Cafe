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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('stockName');
            $table->unsignedBigInteger('category_id');
            $table->string('amount_per_quantity');
            $table->string('measurement');
            $table->string('current_stock');
            $table->string('supplier');
            $table->date('delivery_date');
            $table->date('expiration_date')->nullable();
            $table->timestamps();

            $table->foreign('category_id')
                ->references('id')
                ->on('inventory_category')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
