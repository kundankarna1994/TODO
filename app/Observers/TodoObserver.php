<?php

namespace App\Observers;

use App\Events\TodoCompletedEvent;
use App\Events\TodoCreatedEvent;
use App\Todo;
use Illuminate\Support\Facades\Log;

class TodoObserver
{
    /**
     * Handle the todo "created" event.
     *
     * @param  \App\Todo  $todo
     * @return void
     */
    public function created(Todo $todo)
    {
        try {
            event(new TodoCreatedEvent($todo));
        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }
    }

    /**
     * Handle the todo "updated" event.
     *
     * @param  \App\Todo  $todo
     * @return void
     */
    public function updated(Todo $todo)
    {
        if($todo->completed){
            try {
                event(new TodoCompletedEvent($todo));
            } catch (\Exception $e) {
                Log::info($e->getMessage());
            }
        }
    }
}
