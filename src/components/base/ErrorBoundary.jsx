import { Component } from 'react';
import './ErrorBoundary.scss';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__icon">😵</div>
          <h2 className="error-boundary__title">页面出错了</h2>
          <p className="error-boundary__message">
            {this.props.fallbackMessage || '抱歉，页面加载出现问题'}
          </p>
          <button className="error-boundary__btn" onClick={this.handleRetry}>
            重试
          </button>
          <button
            className="error-boundary__btn error-boundary__btn--secondary"
            onClick={() => window.location.href = '/'}
          >
            返回首页
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
