#!/usr/bin/env node

/**
 * 简化版测试 - 检查 HTML 文件结构
 */

const fs = require('fs');
const path = require('path');

function testHTMLFile() {
    console.log('🧪 测试女性心理健康自评 Web App\n');
    console.log('='.repeat(50));
    
    const filePath = path.resolve(__dirname, 'index.html');
    const html = fs.readFileSync(filePath, 'utf-8');
    
    const results = { passed: 0, failed: 0, tests: [] };
    
    function addTest(name, passed) {
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${name}`);
        results.tests.push({ name, passed });
        if (passed) results.passed++;
        else results.failed++;
    }
    
    // 1. 检查文件存在
    addTest('文件存在', fs.existsSync(filePath));
    
    // 2. 检查基本结构
    addTest('DOCTYPE 声明', html.includes('<!DOCTYPE html>'));
    addTest('中文编码', html.includes('charset="UTF-8"'));
    addTest('标题正确', html.includes('<title>女性心理健康自评</title>'));
    
    // 3. 检查启动页
    addTest('启动页元素', html.includes('welcome-overlay'));
    addTest('启动页图标', html.includes('welcome-icon'));
    addTest('开始按钮', html.includes('开始使用'));
    addTest('功能列表', html.includes('welcome-features'));
    
    // 4. 检查 Tab 导航
    addTest('Tab: 自评', html.includes('>自评<'));
    addTest('Tab: 趋势', html.includes('>趋势<'));
    addTest('Tab: 日历', html.includes('>日历<'));
    addTest('Tab: 呼吸', html.includes('>呼吸<'));
    addTest('Tab: 解压', html.includes('>解压<'));
    addTest('Tab: 更多', html.includes('>更多<'));
    
    // 5. 检查核心功能
    addTest('问题卡片', html.includes('question-card'));
    addTest('选项功能', html.includes('option'));
    addTest('进度条', html.includes('progress-bar'));
    
    // 6. 检查趋势页面
    addTest('趋势统计', html.includes('trend-stats'));
    addTest('趋势图', html.includes('trendChart'));
    addTest('历史对比', html.includes('历史对比'));
    
    // 7. 检查日历页面
    addTest('日历网格', html.includes('calendar-grid'));
    addTest('日历月份', html.includes('calendarMonth'));
    
    // 8. 检查呼吸页面
    addTest('呼吸圈', html.includes('breathing-circle'));
    addTest('呼吸模式', html.includes('breath-preset'));
    
    // 9. 检查气泡页面
    addTest('气泡网格', html.includes('bubble-grid'));
    addTest('气泡数量', html.includes('18'));
    addTest('音效开关', html.includes('soundToggle'));
    
    // 10. 检查更多页面
    addTest('小贴士', html.includes('tip-card'));
    addTest('目标设定', html.includes('goals-section'));
    addTest('资源库', html.includes('resources-section'));
    addTest('雷达图', html.includes('radarChart'));
    
    // 11. 检查模态框
    addTest('结果模态框', html.includes('resultModal'));
    addTest('对比模态框', html.includes('comparisonModal'));
    addTest('资源模态框', html.includes('resourcesModal'));
    
    // 12. 检查功能函数
    addTest('init 函数', html.includes('function init()'));
    addTest('startApp 函数', html.includes('function startApp()'));
    addTest('showTab 函数', html.includes('function showTab()'));
    addTest('showResult 函数', html.includes('function showResult()'));
    addTest('drawTrendChart 函数', html.includes('function drawTrendChart()'));
    addTest('renderCalendar 函数', html.includes('function renderCalendar()'));
    addTest('showHistoryComparison 函数', html.includes('function showHistoryComparison()'));
    
    // 13. 检查配置
    addTest('题目配置', html.includes('QUESTIONS'));
    addTest('维度名称', html.includes('DIMENSION_NAMES'));
    addTest('小贴士配置', html.includes('TIPS'));
    
    // 14. 检查样式
    addTest('粉色主题', html.includes('#f472b6'));
    addTest('动画效果', html.includes('@keyframes'));
    addTest('响应式设计', html.includes('@media'));
    
    // 15. 检查数据存储
    addTest('localStorage 使用', html.includes('localStorage'));
    addTest('心理健康历史', html.includes('mentalHealthHistory'));
    
    // 输出统计
    console.log('='.repeat(50));
    console.log(`✅ 通过: ${results.passed}`);
    console.log(`❌ 失败: ${results.failed}`);
    console.log(`📈 总计: ${results.passed + results.failed}`);
    
    const rate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    console.log(`🎯 成功率: ${rate}%`);
    
    if (results.failed > 0) {
        console.log('\n❌ 失败项:');
        results.tests.filter(t => !t.passed).forEach(t => {
            console.log(`   - ${t.name}`);
        });
    }
    
    console.log('\n✨ HTML 结构测试完成！');
}

testHTMLFile();
