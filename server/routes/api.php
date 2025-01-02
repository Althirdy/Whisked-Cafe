<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/v1/mealCategory',function() {
    $categories = DB::table('meal_categories')->select('id', 'category')->get();
    return response()->json($categories);
});