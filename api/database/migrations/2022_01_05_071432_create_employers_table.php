<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->default(0);
            $table->bigInteger('category_id')->default(0);
            $table->string('name')->nullable();                                    
            $table->string('phone')->nullable(); 
            $table->string('address')->nullable();                 
            $table->string('country')->nullable();                 
            $table->string('state')->nullable();                 
            $table->string('city')->nullable();                 
            $table->string('district')->nullable();                 
            $table->boolean('status')->default(0);    
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
        Schema::dropIfExists('employers');
    }
}
