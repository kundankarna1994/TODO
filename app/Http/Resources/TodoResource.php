<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'asignee' => $this->asignee,
            'completed' => $this->completed,
            'due_date' => $this->due_date,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'formated_due_date' => Carbon::parse($this->due_date)->format('m/d/Y'),
            'total_comments' => $this->comments->count(),
            'readable_due_date' => Carbon::parse($this->due_date)->diffForHumans(),
            'asignee_name' => $this->asigned->name 
        ];
    }
}
