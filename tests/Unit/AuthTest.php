<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
//    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_server()
    {
        $this->assertTrue(true);
    }

    public function test_register_view()
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
        $response->assertViewIs('auth.register');
    }

    public function test_login_view()
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
        $response->assertViewIs('auth.login');
    }

    public function test_user_login()
    {
        $user = factory(User::class)->create([
            'password' => bcrypt($password = 'password')
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $password,
            'remember' => 'on',
        ]);

        $response->assertRedirect('/');
        // cookie assertion goes here
        $this->assertAuthenticatedAs($user);
    }

    public function test_email_verfication()
    {
        $user = factory(User::class)->create([
            'password' => bcrypt($password = 'password'),
            'email_verified_at' => null
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $password,
            'remember' => 'on',
        ]);

        $response->assertRedirect('/');

        $response = $this->get('/');
        // cookie assertion goes here
        $response->assertRedirect('/email/verify');
    }

    public function test_email_verified()
    {
        $user = factory(User::class)->create([
            'password' => bcrypt($password = 'password'),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $password,
            'remember' => 'on',
        ]);

        $response->assertRedirect('/');

        $response = $this->get('/');
        // cookie assertion goes here
        $response->assertStatus(200);
    }
}
