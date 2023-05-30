<?php

namespace App\Controller\Backend;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/admin/users', name: 'admin.user')]
class UserController extends AbstractController
{
    public function __construct(
        private readonly UserRepository $repo
    ) {
    }

    #[Route('', name: '.index', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('Backend/User/index.html.twig', [
            'users' => $this->repo->findAll(),
        ]);
    }
}
