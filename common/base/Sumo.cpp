/**
 * @file Sumo.h
 * @brief Function(s) for Sumolight purposes
 */

#include "Sumo.h"
#include <cppunit/extensions/HelperMacros.h>
#include <set>
#include <string>
#include <vector>

#include "ola/Logging.h"
#include "ola/StringUtils.h"
#include "olad/Preferences.h"
#include "ola/testing/TestUtils.h"


using ola::BoolValidator;
using ola::FileBackedPreferences;
using ola::FileBackedPreferencesFactory;
using ola::IntToString;
using ola::IntValidator;
using ola::UIntValidator;
using ola::MemoryPreferencesFactory;
using ola::Preferences;
using ola::SetValidator;
using ola::StringValidator;
using ola::IPv4Validator;
using std::string;
using std::vector;


void DebugSumo(std::string msg){

    OLA_WARN << msg;
}
int dmx2sumo(std::string str, int j){
	std::vector<int> vect;
	std::stringstream ss(str);
	int i;

	  while (ss >> i)
	  {
	      vect.push_back(i);

	      if (ss.peek() == ',')
	          ss.ignore();
	  }
	  int arr[5];
	  std::copy(vect.begin(), vect.end(), arr);
	  return arr[j];
}
/*
class SumoPreferences{

public:
    void setUp() {
      ola::InitLogging(ola::OLA_LOG_DEBUG, ola::OLA_LOG_STDERR);
    }
    //void Validators();
    void GetSetRemove();
   // void Bool();
   // void Factory();
   // void Load();
   // void Save();
};

void SumoPreferences::GetSetRemove() {
  MemoryPreferencesFactory factory;
  Preferences *preferences = factory.NewPreference("sumo");
    string key1 = "Intensity";
   // string key2 = "ColorTemperature";
   // string key3 = "DMX";
   // string key4 = "OnOff";
    string value1 = "40";
   // string value2 = "4500";
   // string value3 = "1";
   // string value4 = "true";

    preferences->SetValue(key1, value1);
   // preferences->SetValue(key2, value2);
   // preferences->SetValue(key3, value3);
   // preferences->SetValue(key4, value4);
}
*/
