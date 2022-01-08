<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeekerPreferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seeker_preferences', function (Blueprint $table) {
            $table->id();
            $table->string('employer_id')->nullable(); 
            $table->string('gender')->nullable();                 
            $table->string('marital')->nullable();                 
            $table->string('food_accommodation')->nullable();                 
            $table->string('working_time')->nullable();                 
            $table->string('salary')->nullable();
            $table->string('experience')->nullable();
            $table->longText('qualifications')->nullable();
            $table->longText('other_demands')->nullable();
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
        Schema::dropIfExists('seeker_preferences');
    }
}
