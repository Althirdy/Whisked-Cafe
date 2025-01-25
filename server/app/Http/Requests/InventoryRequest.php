<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
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
            'stockName' => 'required|string|max:255',                // Ensure stock name is a string and not empty
            'quantity' => 'required|integer|min:1',                   // Ensure quantity is a positive integer
            'amountPerQuantity' => 'required|string|max:20',       // Ensure amount is a positive number
            'measurement' => 'required|string|max:100',                // Ensure measurement is a string (you can customize max length)
            'category' => 'nullable|exists:inventory_category,id',             // Ensure category is a valid ID or nullable
            'supplier' => 'required|string|max:255',                   // Ensure supplier is a string and not empty
            'deliveryDate' => 'required|date_format:Y-m-d|before_or_equal:expirationDate', // Ensure delivery date is a valid date and before expiration date
            'expirationDate' => 'required|date_format:Y-m-d|after_or_equal:deliveryDate',  // Ensure expiration date is a valid date and after delivery date
        ];
    }
}
