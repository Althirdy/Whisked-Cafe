<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OnlineOrdersRequest extends FormRequest
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
            'customerId' => 'required|numeric|max:50',
            'meals' => 'required|json',
            'pickUp' => 'required|string|max:10',
            'referenceNumber' => 'nullable|string|max:4',
            'totalPrice' => 'required|numeric|min:0',
            'time' => 'required|string|min:0',
        ];
    }
}
