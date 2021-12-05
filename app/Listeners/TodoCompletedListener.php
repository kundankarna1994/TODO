<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use App\Notifications\TodoCompletedNotification;


class TodoCompletedListener
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
    public function handle($event)
    {
        $model = $event->model;
        $model->user->notify(new TodoCompletedNotification($model));
        event(new NotificationEvent($model->user));
    }
}
