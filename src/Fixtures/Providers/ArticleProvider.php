<?php

namespace App\Fixtures\Providers;

use Faker\Factory;
use Faker\Generator;
use Symfony\Component\HttpFoundation\File\File;

class ArticleProvider
{
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }

    public function generateLoremContent(): string
    {
        return file_get_contents('https://loripsum.net/api/10/long/headers/link/ul/dl');
    }

    public function generateDateTimeImmutable(): \DateTimeImmutable
    {
        return \DateTimeImmutable::createFromMutable($this->faker->dateTimeThisYear());
    }

    public function uploadImageArticle(): File
    {
        $files = glob(realpath(__DIR__ . '/Images/Articles/') . '/*.*');
    }
}
