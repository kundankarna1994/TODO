<?php

namespace Tests\Unit;

use App\Events\TodoCreatedEvent;
use App\Notifications\TodoAsignedNotification;
use App\Todo;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Event;

class TodoApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */

    use WithFaker;


    public function test_todo_api_without_login()
    {
        $response = $this->json('get','api/todo');
        $response->assertStatus(401);
    }


    public function get_user()
    {
        $this->artisan('passport:install');
        $this->artisan('passport:client --personal')->expectsQuestion('What should we name the personal access client?', 'Testing');
        $user = factory(User::class)->create();

        $this->actingAs($user, 'api');
        return $user;
    }
    public function test_get_todo_api_with_user()
    {
        $user = $this->get_user();
        factory(Todo::class)->create([
            'user_id' => $user->id
        ]);
        $response = $this->json('get','api/todo');
        $response->assertStatus(200);
    }

    public function test_resource()
    {
        $user = $this->get_user();
        $title = $this->faker->name;
        $response = $this->json('POST','api/todo',[
           'title' => $title,
           'description' => 'Testing',
           'asignee' => 'Testing',
           'due_date' => now(),
           'completed' => 0,
        ]);
        $response->assertStatus(201);
        $response = $this->json('get',"api/todo/". str_slug($title));
        $response->assertStatus(200);

        $response = $this->json('PUT','api/todo/' . str_slug($title),[
            'title' => $title,
            'due_date' => now(),
            'description' => 'Testing Update',
            'completed' => 1,
        ]);
        $todo = factory(Todo::class)->create([
            'user_id' => $user->id
        ]);
        $response = $this->json('POST', 'api/comments/store', [
            'message' => 'Hello',
            'todo_id' => $todo->id,
            'formated_message' => 'Hello'
        ]);
        $response->assertStatus(201);
    }
}
