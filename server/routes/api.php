<?php

use App\Http\Controllers\api\v1\AuthController;
use App\Http\Controllers\api\v1\CustomController;
use App\Http\Controllers\api\v1\EmployeeController;
use App\Http\Controllers\api\v1\InventoryController;
use App\Http\Controllers\api\v1\MealController;
use App\Http\Controllers\api\v1\OnlineOrdersController;
use App\Http\Controllers\api\v1\SuccessOrderController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;



Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/mealCategory', function () {
        $categories = DB::table('meal_categories')->select('id', 'category')->get();
        return response()->json($categories);
    });
    Route::get('/inventoryCategory', function () {
        $categories = DB::table('inventory_category')->select('id', 'category')->get();
        return response()->json($categories);
    });
    Route::get('/weeklyReport', [CustomController::class, 'weeklySales']);
    Route::get('/activeEmployee',[CustomController::class,'ActiveEmployee']);

    Route::apiResource('employee', EmployeeController::class);
    Route::apiResource('meals', MealController::class);
    Route::apiResource('successorder', SuccessOrderController::class);
    Route::apiResource('onlineorder', OnlineOrdersController::class);
    Route::apiResource('inventory', InventoryController::class);
});

Route::post('/v1/login', [AuthController::class, 'login']);
Route::post('/v1/register', [AuthController::class, 'register']);
Route::get('/v1/menu', [CustomController::class, 'fetchMenu']);
