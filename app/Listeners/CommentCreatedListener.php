<?php

namespace App\Listeners;

use App\Events\NotificationEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\CommentCreatedNotification;
use App\Notifications\MentionNotification;
use App\User;

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
        $data = $event->data;
        $mentions = $data['mentions'];
        
        $commenter = $event->comment->user;
        if($commenter->id !== $model->user->id){
            $model->user->notify(new CommentCreatedNotification($model, $commenter));
            event(new NotificationEvent($model->user));
        }
        foreach($mentions as $mention)
        {
            $user = User::find($mention['id']);
            $user->notify(new MentionNotification($model,$commenter));
            event(new NotificationEvent($user));
        }
    }
}
