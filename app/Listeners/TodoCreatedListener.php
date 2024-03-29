<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use App\Events\TodoCreatedEvent;
use App\Notifications\TodoAsignedNotification;

class TodoCreatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(TodoCreatedEvent $event)
    {
        $model = $event->model;

        if($model->asigned){
            $model->asigned->notify(new TodoAsignedNotification($model));
            event(new NotificationEvent($model->asigned));
        }
    }
}
