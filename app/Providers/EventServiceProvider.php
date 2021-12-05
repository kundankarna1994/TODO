<?php

namespace App\Providers;

use App\Todo;
use App\Comment;
use App\Events\CommentCreatedEvent;
use App\Events\TodoCompletedEvent;
use App\Events\TodoCreatedEvent;
use App\Listeners\CommentCreatedListener;
use App\Listeners\TodoCompletedListener;
use App\Listeners\TodoCreatedListener;
use App\Observers\CommentObserver;
use App\Observers\TodoObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        TodoCreatedEvent::class => [
            TodoCreatedListener::class
        ],
        TodoCompletedEvent::class => [
            TodoCompletedListener::class
        ],
        CommentCreatedEvent::class => [
            CommentCreatedListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        Todo::observe(TodoObserver::class);
        Comment::observe(CommentObserver::class);
    }
}
