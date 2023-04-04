<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Tests\Unit;

use Piwik\Tracker\TrackerCodeGenerator;

/**
 * @group Core
 * @group TrackerCodeGenerator
 */
class TrackerCodeGeneratorTest extends \PHPUnit\Framework\TestCase
{
    /**
    * Check 'www.' text is removed if its exists in the given array of urls.
    */
    public function testCheckRemoveWwwIfexitsInArray()
    {
        $trackerCodeGenerator = new TrackerCodeGenerator();
        $urlArray = array(
            'www.localhost/piwik',
            'another-domain/piwik',
            'www.another-domain/piwik'
        );
        $actual = $trackerCodeGenerator->checkRemoveWwwIfexists($urlArray);

        $expected = array(
            'localhost/piwik',
            'another-domain/piwik',
            'another-domain/piwik'
        );
        $this->assertEquals($expected, $actual);
    }


    /**
    * Check 'www.' text is removed if its exists in the given url.
    */
    public function testCheckRemoveWwwIfexitsInString()
    {
        $trackerCodeGenerator = new TrackerCodeGenerator();
        $urlString = 'www.localhost/piwik';
        $actual = $trackerCodeGenerator->checkRemoveWwwIfexists($urlString);

        $expected = 'localhost/piwik';
        $this->assertEquals($expected, $actual);
    }
    
    /**
    * Check 'www.' text and return the same if its not exists in the given array of urls.
    */
    public function testReturnSameInputArray()
    {
        $trackerCodeGenerator = new TrackerCodeGenerator();
        $urlArray = array(
            'localhost.www./piwik',
            'another-domain/piwik',
            'wwwanother-domain.www./piwik'
        );
        $actual = $trackerCodeGenerator->checkRemoveWwwIfexists($urlArray);

        $expected = array(
            'localhost.www./piwik',
            'another-domain/piwik',
            'wwwanother-domain.www./piwik'
        );
        $this->assertEquals($expected, $actual);
    }


    /**
    * Check 'www.' text and return the same if its not exists in the url.
    */
    public function testReturnSameInputString()
    {
        $trackerCodeGenerator = new TrackerCodeGenerator();
        $urlString = 'wwwlocalhost/piwik';
        $actual = $trackerCodeGenerator->checkRemoveWwwIfexists($urlString);

        $expected = 'wwwlocalhost/piwik';
        $this->assertEquals($expected, $actual);
    }
}
