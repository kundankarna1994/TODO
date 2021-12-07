<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Todo;
use Faker\Generator as Faker;

$factory->define(Todo::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'description' => $faker->sentence($nbWords = 10, $variableNbWords = true),
        'asignee' => 2,
        'completed' => 0,
        'slug' => $faker->sentence($nbWords = 6, $variableNbWords = true)  ,
        'due_date' => now()
    ];
});
