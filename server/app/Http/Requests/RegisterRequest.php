<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'fullName' => 'required|string|max:100',
            'phoneNumber' => ['required', 'regex:/^(\+63|0)9\d{9}$/'], // Philippine number format
            'email' => 'required|string|email|max:100|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }
       /**
     * Custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'phoneNumber.regex' => 'The phone number must be a valid Philippine number starting with +63 or 09.',
        ];
    }
}
