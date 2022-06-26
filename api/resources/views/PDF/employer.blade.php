@extends('PDF.layouts.app')
@section('content')

<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
    <tbody>       
        <tr>
            <td class="leftBg" width="32%">		      
                <h3>
                    Company Details
                </h3>
                
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="leftblock">
                                <h4>Company Name:</h4>
                                <div class="center">{{ $user->employer->name }}</div>
                            </div>                                
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                <span class="leftHead">Email Id: </span>
                                <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>                            
                            </div>                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                <span class="leftHead">Mobile: </span>
                                <div>
                                 <a href="tel:{{ $user->employer->phone }}">{{ $user->employer->phone }}</a> <br/>                       
                                 <a href="tel:{{ $user->phone }}">{{ $user->phone }}</a>                            
                                </div>
                            </div>                                                
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Contact Name: {{ $user->name }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Address: {{ $user->employer->address }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                State: {{ $user->employer->state }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Country: {{ $user->employer->country }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                City: {{ $user->employer->city }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="leftblock">
                                Pin: {{ $user->employer->pin }}
                            </div>
                        </td>
                    </tr>
                </table>
		    </td>
            <td>
                <h1>Job Vaccancy for {{ $user->employer->category->name }}   </h1>
                <table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                        <td>
                            <div class="rightHead">
                                Looking Candidate
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->gender ? $user->employer->seekerPreference->gender : 'Any' }}
                            </div>                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Looking Candidate Status
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->marital ? $user->employer->seekerPreference->marital : 'Any' }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Food & Accomodation Available
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->food_accommodation  }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Working Time
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->working_time  }}
                            </div>  
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Starting Offer Salary
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->salary  }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Candidate Educational Qualifications
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->qualifications  }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Candidate Work Expierience
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->experience  }}
                            </div>                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="rightHead">
                                Other Demands
                            </div>
                            <div class="rightHeadAns">
                                {{ $user->employer->seekerPreference->other_demands  }}
                            </div>                            
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
