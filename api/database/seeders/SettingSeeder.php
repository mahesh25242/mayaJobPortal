<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(DB::table('settings')->where('name', 'site_name')->doesntExist()){
            $input = [
                'name' => 'site_name',                
                'value' => 'MayaJobs',                
            ];
            $setting = \App\Models\Setting::create($input);
        }

        if(DB::table('settings')->where('name', 'site_email')->doesntExist()){
            $input = [
                'name' => 'site_email',                
                'value' => 'mahesh25242@gmail.com',                
            ];
            $setting = \App\Models\Setting::create($input);
        }
    }
}
