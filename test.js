#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

async function testMentalHealthApp() {
    console.log('🧪 开始测试女性心理健康自评 Web App...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const results = { passed: 0, failed: 0, tests: [] };
    
    function addTest(name, passed, message = '') {
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${name}${message ? ': ' + message : ''}`);
        results.tests.push({ name, passed, message });
        if (passed) results.passed++;
        else results.failed++;
    }
    
    async function closeOverlay() {
        await page.evaluate(() => {
            const el = document.getElementById('welcomeOverlay');
            if (el) el.style.display = 'none';
        });
    }
    
    try {
        console.log('📄 测试 1: 页面加载...\n');
        const filePath = path.resolve(__dirname, 'index.html');
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
        
        const title = await page.title();
        addTest('页面标题正确', title === '女性心理健康自评', `"${title}"`);
        
        console.log('\n🎯 测试 2: 启动页...\n');
        const welcomeVisible = await page.isVisible('#welcomeOverlay');
        addTest('启动页显示', welcomeVisible);
        
        await page.evaluate(() => { startApp(); });
        await page.waitForTimeout(500);
        
        const overlayDisplay = await page.evaluate(() => {
            const el = document.getElementById('welcomeOverlay');
            return window.getComputedStyle(el).display;
        });
        addTest('启动页可关闭', overlayDisplay === 'none', `display: ${overlayDisplay}`);
        
        console.log('\n📑 测试 3-8: 功能页面...\n');
        const tabs = [
            { name: '自评', id: 'assessment' },
            { name: '趋势', id: 'trend' },
            { name: '日历', id: 'calendar' },
            { name: '呼吸', id: 'breath' },
            { name: '解压', id: 'bubble' },
            { name: '更多', id: 'more' }
        ];
        
        for (const tab of tabs) {
            await page.click(`.nav-tab:has-text("${tab.name}")`);
            await page.waitForTimeout(200);
            const active = await page.isVisible(`#${tab.id}Tab.active`);
            addTest(`Tab "${tab.name}" 可切换`, active);
        }
        
        console.log('\n📝 测试 9: 自评功能...\n');
        await page.click('.nav-tab:has-text("自评")');
        await page.waitForTimeout(300);
        
        // 使用 evaluate 点击选项
        const optionClicked = await page.evaluate(() => {
            const options = document.querySelectorAll('.option');
            if (options.length > 0) {
                options[0].click();
                return options[0].classList.contains('selected');
            }
            return false;
        });
        addTest('选项可选择', optionClicked);
        
        console.log('\n🫧 测试 10: 气泡解压...\n');
        await page.click('.nav-tab:has-text("解压")');
        await page.waitForTimeout(200);
        const bubbleCount = await page.locator('.bubble').count();
        addTest('气泡数量正确', bubbleCount === 18, `${bubbleCount}个`);
        
        await page.click('.bubble:first-child');
        await page.waitForTimeout(300);
        const popped = await page.locator('.bubble.popped').count();
        addTest('气泡可戳破', popped > 0);
        
        console.log('\n💡 测试 11: 今日小贴士...\n');
        await page.click('.nav-tab:has-text("更多")');
        await page.waitForTimeout(200);
        const tipVisible = await page.isVisible('.tip-card');
        addTest('小贴士显示', tipVisible);
        
        console.log('\n🎯 测试 12: 目标设定...\n');
        const goalsVisible = await page.isVisible('.goals-section');
        addTest('目标区域显示', goalsVisible);
        
        console.log('\n📈 测试 13: 雷达图...\n');
        const radarVisible = await page.isVisible('#radarChart');
        addTest('雷达图存在', radarVisible);
        
        console.log('\n💾 测试 14: 数据存储...\n');
        const hasStorage = await page.evaluate(() => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        });
        addTest('本地存储可用', hasStorage);
        
        console.log('\n🎨 测试 15: 响应式设计...\n');
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(200);
        const mobileWorks = await page.isVisible('.container');
        addTest('移动端适配', mobileWorks);
        
    } catch (error) {
        console.error('\n❌ 测试出错:', error.message);
        addTest('测试执行', false, error.message);
    } finally {
        await browser.close();
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 测试结果总结');
    console.log('='.repeat(50));
    console.log(`✅ 通过: ${results.passed}`);
    console.log(`❌ 失败: ${results.failed}`);
    console.log(`🎯 成功率: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
    console.log('='.repeat(50) + '\n');
}

testMentalHealthApp().catch(console.error);
