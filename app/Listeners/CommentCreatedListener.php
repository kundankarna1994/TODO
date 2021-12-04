<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\CommentCreatedNotification;

class CommentCreatedListener
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
        $model = $event->comment->todo;
        $commenter = $event->comment->user;
        if($commenter->id !== $model->user->id){
            $model->user->notify(new CommentCreatedNotification($model, $commenter));
            event(new NotificationEvent($model->user));
        }
    }
}
