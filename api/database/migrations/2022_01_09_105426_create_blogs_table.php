<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); 
            $table->string('image')->nullable(); 
            $table->longText('description')->nullable(); 
            $table->longText('meta_description')->nullable(); 
            $table->longText('meta_keywords')->nullable(); 
            $table->boolean('status')->default(0);   
            $table->bigInteger('created_by')->default(0);
            $table->bigInteger('updated_by')->default(0);            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}
