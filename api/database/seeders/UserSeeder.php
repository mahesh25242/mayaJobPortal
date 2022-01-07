<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(DB::table('users')->where('email', 'admin@mayajobs.com')->doesntExist()){
            $input = [
                'name' => 'Super User',                
                'status' => 1,
                'email' => 'admin@mayajobs.com',
                'password' => Hash::make('123456'),
                'phone' => '123456'
            ];
            $user = \App\Models\User::create($input);
        }
    }
}
