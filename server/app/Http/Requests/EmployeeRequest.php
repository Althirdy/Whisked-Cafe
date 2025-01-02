<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullName' => 'required|string|max:255',
            'phoneNumber' => [
                'required',
                'regex:/^(09|\+639)\d{9}$/', // Regex for valid Philippine phone numbers
            ],
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string|max:255',
            'password' => 'required|min:8|confirmed', // Automatically checks confirm_password
        ];
    }
    /**
     * Customize the error messages for validation.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'phoneNumber.regex' => 'The phone number must be a valid Philippine phone number.',
            'password.confirmed' => 'The password confirmation does not match.',
        ];
    }
}
