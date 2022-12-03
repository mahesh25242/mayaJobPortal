@extends('PDF.layouts.app')
@section('content')
<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
    <tbody>       
        <tr>
            <td class="leftBg" width="32%">		                      
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="leftblock">
                                <b>{{ $user->name }}</b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                <span class="leftHead">Email Id: </span>
                                {{ $user->email }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                <span class="leftHead">Mobile: </span>
                                <div>
                                    <a href="tel:{{ $user->seeker->phone }}">{{ $user->seeker->phone }}</a></br>
                                    <a href="tel:{{ $user->phone }}">{{ $user->phone }}</a>
                                </div>
                                <br/>
                                
                            </div>                            
                        </td>
                    </tr>                   
                    <tr>
                        <td>
                            <div class="leftblock">
                                Home Address: {{ $user->seeker->home_address }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Google Address: {{ $user->seeker->address }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Nationality: {{ $user->seeker->nationality }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                State: {{ $user->seeker->state }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Country: {{ $user->seeker->country }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                City: {{ $user->seeker->city }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Pin: {{ $user->seeker->pin }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Date of Birth: {{ $user->seeker->dob }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Gender: {{ $user->seeker->gender }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Religion: {{ $user->seeker->religion }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Maritial Status: {{ $user->seeker->marital }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Languages: {{ $user->seeker->languages }}
                            </div>
                        </td>
                    </tr>
                </table>
		    </td>
            <td>
                <h1>Resume for {{ $user->seeker->category ? $user->seeker->category->name : '' }}   </h1>                   
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="rightHead">
                                Educational Qualification
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->seeker->edu_qualification }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Technical Qualifications
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->seeker->tech_qualification }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Work Experience
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->seeker->experience  }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Accademic Profile
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->seeker->academic_profile  }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Expected Salary
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->seeker->expected_salary  }}
                            </div>
                        </td>
                    </tr>                    
                </table>   
            </td>
        </tr>       

  </tbody>
</table>


@endsection

