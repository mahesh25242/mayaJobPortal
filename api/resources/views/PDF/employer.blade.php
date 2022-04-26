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
                            {{ $user->employer->name }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {{ $user->email }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {{ $user->employer->phone }}<br/>
                            {{ $user->phone }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact Name: {{ $user->name }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address: {{ $user->employer->address }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            State: {{ $user->employer->state }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Country: {{ $user->employer->country }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City: {{ $user->employer->city }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Pin: {{ $user->employer->pin }}
                        </td>
                    </tr>
                </table>
		    </td>
            <td>
                Job Vaccancy for {{ $user->employer->category->name }}   
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="mainbg">
                                Looking Candidate
                            </div>
                            {{ $user->employer->seekerPreference->gender ? $user->employer->seekerPreference->gender : 'Any' }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Looking Candidate Status
                            </div>
                            {{ $user->employer->seekerPreference->marital ? $user->employer->seekerPreference->marital : 'Any' }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Food & Accomodation Available
                            </div>
                            {{ $user->employer->seekerPreference->food_accommodation  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Working Time
                            </div>
                            {{ $user->employer->seekerPreference->working_time  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Starting Offer Salary
                            </div>
                            {{ $user->employer->seekerPreference->salary  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Candidate Educational Qualifications
                            </div>
                            {{ $user->employer->seekerPreference->qualifications  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Candidate Work Expierience
                            </div>
                            {{ $user->employer->seekerPreference->experience  }}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="mainbg">
                                Other Demands
                            </div>
                            {{ $user->employer->seekerPreference->other_demands  }}
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
