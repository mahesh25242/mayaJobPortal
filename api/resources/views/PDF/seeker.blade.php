@extends('PDF.layouts.app')
@section('content')

@extends('PDF.layouts.app')
@section('content')

<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
    <tbody>       
        <tr>
            <td style="padding-bottom:20px;" class="mainbg" width="40%">		      
                Company Details
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            {{ $user->name }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {{ $user->email }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {{ $user->seeker->phone }}<br/>
                            {{ $user->phone }}
                        </td>
                    </tr>                   
                    <tr>
                        <td>
                            Address: {{ $user->seeker->address }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nationality: {{ $user->seeker->nationality }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            State: {{ $user->seeker->state }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Country: {{ $user->seeker->country }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City: {{ $user->seeker->city }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Pin: {{ $user->seeker->pin }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date of Birth: {{ $user->seeker->dob }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Gender: {{ $user->seeker->gender }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Religion: {{ $user->seeker->religion }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Maritial Status: {{ $user->seeker->marital }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Languages: {{ $user->seeker->languages }}
                        </td>
                    </tr>
                </table>
		    </td>
            <td>
                Resume for {{ $user->seeker->category->name }}   
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="mainbg">
                                Educational Qualification
                            </div>
                            {{ $user->seeker->edu_qualification }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Technical Qualifications
                            </div>
                            {{ $user->seeker->tech_qualification }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Work Experience
                            </div>
                            {{ $user->seeker->experience  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Accademic Profile
                            </div>
                            {{ $user->seeker->academic_profile  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Expected Salary
                            </div>
                            {{ $user->seeker->expected_salary  }}
                        </td>
                    </tr>                    
                </table>   
            </td>
        </tr>
        <!-- <tr>
            <td>
                Phone
            </td>
            <td>
            {{ $user->phone }}
            </td>
        </tr>
        <tr>
            <td>
                Email
            </td>
            <td>
                {{ $user->email }}
            </td>
        </tr>
        <tr>
            <td>
                Contact Details
            </td>
            <td>                                        
                <p>{{ $user->employer->address }} </p>                             
                <p>{{ $user->employer->state }} </p>                             
                <p>{{ $user->employer->city }} </p>                             
                <p>{{ $user->employer->district }} </p>                             
                <p>{{ $user->employer->country }} </p>  
            </td>
        </tr> -->

  </tbody>
</table>


@endsection



@endsection
