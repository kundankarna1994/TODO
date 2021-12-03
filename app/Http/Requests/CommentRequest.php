<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'message' => 'required|string|max:500',
            'todo_id' => 'required',
            'formated_message' => 'required|string|max:500',
        ];
    }

    public function messages()
    {
        return [
            'message.required' => 'Comment Cannot be empty.',
            'message.max' => 'Comment Cannot be more than 255 character',
        ];
    }
}
