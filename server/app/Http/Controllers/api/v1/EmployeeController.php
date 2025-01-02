<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = $request->input('query');

        $employees = User::whereNotNull('role')
            ->where('role', '!=', 'Owner')
            ->where('isActive', true);

        // Apply filtering if 'query' parameter is provided
        if ($query) {
            $employees->where(function ($q) use ($query) {
                $q->where('fullName', 'LIKE', "%{$query}%")
                    ->orWhere('email', 'LIKE', "%{$query}%")
                    ->orWhere('phoneNumber', 'LIKE', "%{$query}%");
            });
        }

        // Paginate the results
        $employees = $employees->paginate(10);

        return UserResource::collection($employees);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $emplyee = User::create([
            'fullName' => $request->input('fullName'),
            'email' => $request->input('email'),
            'role' => $request->input('role'),
            'phoneNumber' => $request->input('phoneNumber'),
            'password' => Hash::make(($request->input('password'))),
        ]);
        return response()->json([
            'message' => 'Employee added successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = User::findOrFail($id);  // Fetch the employee

        // Validate password and confirm password
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Update password
        $employee->password = Hash::make($validated['password']);
        $employee->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = User::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->isActive = false;
        $employee->save();
        return response()->json(['message' => 'Employee account deactivated successfully']);
    }
}
