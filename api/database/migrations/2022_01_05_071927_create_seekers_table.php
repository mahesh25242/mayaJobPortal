<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeekersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seekers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->default(0);
            $table->bigInteger('category_id')->default(0);
            $table->string('phone')->nullable(); 
            $table->string('address')->nullable();                 
            $table->string('home_address')->nullable();                 
            $table->string('country')->nullable();                 
            $table->string('nationality')->nullable();                 
            $table->string('state')->nullable();                 
            $table->string('city')->nullable();                 
            $table->string('district')->nullable();                 
            $table->string('pin')->nullable();                 
            $table->date('dob')->nullable();                 
            $table->string('gender')->nullable();                 
            $table->string('religion')->nullable();                 
            $table->string('marital')->nullable();                 
            $table->string('languages')->nullable();                 
            $table->boolean('status')->default(0);  
            $table->longText('edu_qualification')->nullable();     
            $table->longText('tech_qualification')->nullable();     
            $table->longText('experience')->nullable();     
            $table->longText('academic_profile')->nullable();     
            $table->string('expected_salary')->nullable();     
            $table->longText('admin_note')->nullable();     
            $table->string('lat')->nullable(); 
            $table->string('lng')->nullable();        
            $table->bigInteger('created_by')->default(0);
            $table->bigInteger('updated_by')->default(0);
            $table->bigInteger('deleted_by')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seekers');
    }
}
