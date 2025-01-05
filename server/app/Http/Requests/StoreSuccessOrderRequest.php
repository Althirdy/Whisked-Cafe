<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuccessOrderRequest extends FormRequest
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
            'crewID'=> 'required',
            'customerName' => 'required|string|max:50',
            'orderType' => 'required|string|max:10',
            'meals' => 'required|json',
            'paymentMethod' => 'required|string|max:10',
            'referenceNumber' => 'nullable|string|max:4',
            'totalPrice' => 'required|numeric|min:0',
            'tender' => 'required|numeric|min:0',
            'change' => 'required|numeric|min:0',
        ];
    }
}
