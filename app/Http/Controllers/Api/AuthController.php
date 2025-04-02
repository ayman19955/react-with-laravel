<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{


    public function signup(SignupRequest $request)
    {

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201); // 201 Created for successful resource creation


    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json(['errors' => ['error' => 'These credentials do not match our records.']], 401);
        }

        return response()->json([
            'user' => Auth::user(),
            'token' => Auth::user()->createToken('API Token')->plainTextToken
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();  // Passport-specific method
        $user->currentAccessToken()->delete();  // More explicit than response('', 204)
        return response('', 204);
    }
}
