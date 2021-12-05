<?php

namespace App\Observers;

use App\Comment;
use App\Events\CommentCreatedEvent;
use Illuminate\Support\Facades\Log;

class CommentObserver
{
    /**
     * Handle the comment "created" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function created(Comment $comment)
    {
        try {
            event(new CommentCreatedEvent($comment));
        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }
    }
}
