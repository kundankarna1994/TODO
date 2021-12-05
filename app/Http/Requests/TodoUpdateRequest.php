<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * TodoUpdateRequest
 */
class TodoUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255|string',
            'due_date' => 'required',
            'description' => 'string|required|max:500',
            'asignee' => ''
        ];
    }

    /**
     * @return string[]
     */
    public function messages()
    {
        return [
            'title.required' => 'Todo title is required',
            'title.max' => 'Title cannot be more than 255 character',
        ];
    }
}
